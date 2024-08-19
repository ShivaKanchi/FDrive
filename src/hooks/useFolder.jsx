import { useEffect, useReducer } from "react";
import {
  doc,
  getDoc,
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { database } from "../utils/firebase-config";
import { useAuth } from "../contexts/AuthContext";

const ROOT_FOLDER = { name: "Root", id: null, path: [] };

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
      payload: { folderId, folder },
    });
  }, [folderId, folder]);

  useEffect(() => {
    if (folderId == null) {
      dispatch({
        type: ACTIONS.UPDATE_FOLDER,
        payload: { folder: ROOT_FOLDER },
      });
      return;
    }

    const folderRef = doc(database, "folders", folderId); // Correctly referencing the doc

    getDoc(folderRef)
      .then((doc) => {
        if (doc.exists()) {
          dispatch({
            type: ACTIONS.UPDATE_FOLDER,
            payload: { folder: { id: doc.id, ...doc.data() } },
          });
        } else {
          dispatch({
            type: ACTIONS.UPDATE_FOLDER,
            payload: { folder: ROOT_FOLDER },
          });
        }
      })
      .catch((error) => {
        console.error("Error fetching document: ", error);
        dispatch({
          type: ACTIONS.UPDATE_FOLDER,
          payload: { folder: ROOT_FOLDER },
        });
      });
  }, [folderId]);

  useEffect(() => {
    if (!folderId || !currentUser) return;

    const q = query(
      collection(database, "folders"),
      where("parentId", "==", folderId),
      where("userId", "==", currentUser.uid),
      orderBy("createdAt")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      dispatch({
        type: ACTIONS.SET_CHILD_FOLDERS,
        payload: {
          childFolders: snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          })),
        },
      });
    });

    return unsubscribe;
  }, [folderId, currentUser, dispatch]);

  return state;
}
