import { Button, Card, Form } from "react-bootstrap";
export default function SignIn() {
  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Sign Up</h2>
          <Form>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" required ref={emailRef}></Form.Control>
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                required
                ref={passwordRef}
              ></Form.Control>
            </Form.Group>
            <Form.Group id="passwordConfirm">
              <Form.Label>Password Confirm</Form.Label>
              <Form.Control
                type="passwordConfirm"
                required
                ref={passwordConfirmRef}
              ></Form.Control>
            </Form.Group>
            <Button className="w-100 " type="sumit"></Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Already have an account? Log In
      </div>
    </>
  );
}

SignIn;
