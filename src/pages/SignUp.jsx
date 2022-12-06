import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { setDoc, doc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase.config";
import { ReactComponent as ArrowRightIcon } from "../assets/svg/keyboardArrowRightIcon.svg";
import visibilityIcon from "../assets/svg/visibilityIcon.svg";

function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { name, email, password } = formData;
  const navigate = useNavigate();
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;
      updateProfile(auth.currentUser, {
        displayname: name,
      });
      //บรรทัดนี้เอาข้อมูลมาจาก formData เอาค่าปัจจุบันของ state จะมี name,email,password
      const formDataCopy = { ...formData }; 
      // ลบ password ออกจาก database เพราะว่าเก็บไว้ใน ใน authen แล้วเขาสามารถลบได้
      delete formDataCopy.password;
      //กำหนดเวลาจาก server ไปเก็บไว้ที่ array timestamp
      formDataCopy.timestamp = serverTimestamp();
      // เก็บข้อมูลเข้า database ที่ Table Users โดยเอาค่า 
      // uid ของ user นั้นๆ สร้างเป็น document id ตามด้วย name,email
      // users = ชื่อของ Collection,
      await setDoc(doc(db, "users", user.uid), formDataCopy);
//ถ้าสำเร็จให้ redirect กลับไปหน้า explorer
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="pageContainer">
        <header>
          <p className="pageHeader">SignUp</p>
        </header>
        <main>
          <form onSubmit={onSubmit}>
            <input
              type="text"
              className="nameInput"
              placeholder="Name"
              id="name"
              value={name}
              onChange={onChange}
            />
            <input
              type="email"
              className="emailInput"
              placeholder="Email"
              id="email"
              value={email}
              onChange={onChange}
            />
            <div className="passwordInputDiv">
              <input
                type={showPassword ? "text" : "password"}
                className="passwordInput"
                placeholder="Password"
                id="password"
                value={password}
                onChange={onChange}
              />
              <img
                src={visibilityIcon}
                alt="show password"
                className="showPassword"
                onClick={() => setShowPassword((prevState) => !prevState)}
              />
            </div>
            <Link className="forgotPasswordLink">Forgot Password</Link>
            <div className="signUpBar">
              <p className="signIntext">Sign Up</p>
              <button className="signUpButton">
                <ArrowRightIcon fill="#ffffff" width="34px" height="34px" />
              </button>
            </div>
          </form>
          {/* Google oAuth */}
          <Link to="../Sign-In" className="registerLink">
            Sign In Instead
          </Link>
        </main>
      </div>
    </>
  );
}

export default SignUp;
