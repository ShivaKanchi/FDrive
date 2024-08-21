import { useEffect, useReducer } from "react";
import {
  doc,
  getDoc,
  getDocs,
  query,
  where,
  orderBy,
} from "firebase/firestore/lite";
import { useAuth } from "../contexts/AuthContext";
import { getFoldersCollection } from "../utils/firebase-config";

export const ROOT_FOLDER = { name: "Root", id: null, path: [] };

const ACTIONS = {
  SELECT_FOLDER: "select-folder",
  UPDATE_FOLDER: "update-folder",
  SET_CHILD_FOLDERS: "set-child-folders",
};

function reducer(state, { type, payload }) {
  switch (type) {
    case ACTIONS.SELECT_FOLDER:
      return {
        folderId: payload.folderId,
        folder: payload.folder,
        childFolders: [],
        childFiles: [],
      };
    case ACTIONS.UPDATE_FOLDER:
      return {
        ...state,
        folder: payload.folder,
      };
    case ACTIONS.SET_CHILD_FOLDERS:
      return {
        ...state,
        childFolders: payload.childFolders,
      };
    default:
      return state;
  }
}

export function useFolder(folderId = null, folder = null) {
  const [state, dispatch] = useReducer(reducer, {
    folderId,
    folder,
    childFolders: [],
    childFiles: [],
  });
  const { currentUser } = useAuth();

  useEffect(() => {
    dispatch({
      type: ACTIONS.SELECT_FOLDER,
      payload: {
        folderId,
        folder,
      },
    });
  }, [folderId, folder]);

  useEffect(() => {
    if (folderId == null) {
      console.log("it is null");
      return dispatch({
        type: ACTIONS.UPDATE_FOLDER,
        payload: {
          folder: ROOT_FOLDER,
        },
      });
    }

    const folderRef = doc(getFoldersCollection(), folderId);

    getDoc(folderRef)
      .then((doc) => {
        if (doc.exists()) {
          dispatch({
            type: ACTIONS.UPDATE_FOLDER,
            payload: {
              folder: { id: doc.id, ...doc.data() },
            },
          });
        } else {
          console.log("No such document!");
          dispatch({
            type: ACTIONS.UPDATE_FOLDER,
            payload: {
              folder: ROOT_FOLDER,
            },
          });
        }
      })
      .catch((error) => {
        console.error("Error fetching document: ", error);
        dispatch({
          type: ACTIONS.UPDATE_FOLDER,
          payload: {
            folder: ROOT_FOLDER,
          },
        });
      });
  }, [folderId]);

  useEffect(() => {
    const fetchChildFolders = async () => {
      if (currentUser) {
        let queryWrote;

        if (folderId == null) {
          // Query for root-level folders
          queryWrote = query(
            getFoldersCollection(),
            where("parentId", "==", ""),
            where("userId", "==", currentUser.uid),
            orderBy("createdAt")
          );
        } else {
          // Query for child folders
          queryWrote = query(
            getFoldersCollection(),
            where("parentId", "==", folderId),
            where("userId", "==", currentUser.uid),
            orderBy("createdAt")
          );
        }

        try {
          const querySnapshot = await getDocs(queryWrote);
          const childFolders = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          dispatch({
            type: ACTIONS.SET_CHILD_FOLDERS,
            payload: {
              childFolders,
            },
          });
        } catch (error) {
          console.error("Error fetching child folders: ", error);
        }
      }
    };

    fetchChildFolders();
  }, [folderId, currentUser]);

  return state;
}
