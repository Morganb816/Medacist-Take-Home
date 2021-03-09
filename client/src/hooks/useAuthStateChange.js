import firebase from 'firebase';
import { useDispatch } from "react-redux";
import { setUser } from "../store/auth";

/**
 * @name useAuthStateChange
 * @description React hook to update redux with firebase auth state changes
 * @returns {void}
 */
const useAuthStateChange = () => {
    const dispatch = useDispatch();
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      dispatch(setUser({
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL
      }));
      return;
    }
    dispatch(setUser(null));
  });
};

export default useAuthStateChange;