import { useEffect, useRef, useState, FormEvent, ChangeEvent } from "react";
import { motion, useInView } from "framer-motion";
import { useNavigate } from "react-router-dom";
import pageTransition from "@components/pageTransition";
import { useDispatch } from "react-redux";
import { setCurrentRoute } from "../redux/routeSlice";
import axios from "axios";
import FormInput from "@components/FormInput";
import { inputs } from "../utils/constants";
import { RedLineIcon } from "@components/RedLine";
import ImageKit from "@components/ImageKit";
import { AmLogo } from "@components/AmLogo";

interface FormValues {
  firstName: string;
  lastName: string;
  email: string;
  message: string;
}

const ContactPage: React.FC = () => {
  const [values, setValues] = useState<FormValues>({
    firstName: "",
    lastName: "",
    email: "",
    message: ""
  });

  const [isFormValidState, setIsFormValidState] = useState(false);
  const [loading, setLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState<string | null>(null);

  const formRef = useRef<HTMLFormElement>(null);

  const isFormValid = () => {
    return (
      values.firstName.trim() !== "" &&
      values.lastName.trim() !== "" &&
      /^\S+@\S+\.\S+$/.test(values.email.trim()) &&
      values.message.trim().length >= 10
    );
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value
    }));

    setIsFormValidState(isFormValid());
  };

  useEffect(() => {
    document.title = "Contact | Andrija Mićunović Design";
    return () => {
      document.title = "Default Title";
    };
  }, []);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isFormValid()) {
      setResponseMessage("Please fill in all fields correctly.");
      return;
    }

    setLoading(true);
    setResponseMessage(null);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/contact`,
        {
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          message: values.message
        }
      );

      if (response.status === 200) {
        setResponseMessage("Your message has been sent successfully!");
      }
      dispatch(setCurrentRoute("/success"));
      navigate("/success");
    } catch (error) {
      console.error("Error sending message", error);
      setResponseMessage("There was an error sending your message.");
    } finally {
      setLoading(false);
    }
  };

  const titleRef = useRef<HTMLDivElement>(null);
  const isTitleInView = useInView(titleRef);
  const footerRef = useRef<HTMLDivElement>(null);
  const isFooterInView = useInView(footerRef);
  const formContentRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLSpanElement>(null);
  const isLineInView = useInView(lineRef, {
    once: true
  });

  return (
    <section className="contact-page">
      <div className="contact-page__header">
        <div className="contact-page__header-logo-container">
          <AmLogo />
        </div>
        <div style={{ position: "absolute", top: "0", maxWidth: "100%" }}>
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeIn" }}
            className="contact-page__header-wrapper"
          >
            <div className="contact-page__title-container" ref={titleRef}>
              <div className="contact-page__title-content">
                <h2>Contact Me</h2>
                <motion.div className="red-line-wrapper">
                  <div className="red-line-placeholder">
                    {isTitleInView && <RedLineIcon />}
                  </div>
                </motion.div>
              </div>
              <p className="contact-page__form-subtitle">
                Share more about your company and future business goals.
              </p>
            </div>
          </motion.div>

          <motion.div
            className="contact-page__form-container"
            ref={formContentRef}
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1
            }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <motion.form
              className="contact-page__form"
              onSubmit={handleSubmit}
              ref={formRef}
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                delay: 0.75,
                duration: 0.5,
                ease: "easeInOut"
              }}
            >
              {inputs.map((input) => (
                <FormInput
                  key={input.id}
                  {...input}
                  value={values[input.name as keyof FormValues]}
                  onChange={handleChange}
                />
              ))}

              <button
                className="contact-page__btn-send"
                disabled={!isFormValidState || loading}
              >
                {loading ? "Sending..." : "Send"}
              </button>

              {responseMessage && (
                <p className="contact-page__response-message">
                  {responseMessage}
                </p>
              )}
            </motion.form>
          </motion.div>
        </div>
      </div>

      <div className="contact-page__footer-wrapper">
        <div className="contact-page__footer">
          <div className="contact-page__image-container">
            <div className="contact-page__background-image">
              <ImageKit
                path="/images/contact-hero.jpg"
                alt="Sketches of furniture designs highlighting Furniture Design, CAD, and 3D Rendering services."
              />
            </div>
            <motion.div
              ref={footerRef}
              className="contact-page__footer-front-title"
              initial={{ opacity: 0, filter: "blur(60px)" }}
              animate={
                isFooterInView ? { opacity: 1, filter: "blur(0px)" } : {}
              }
              transition={{ duration: 1 }}
            >
              <h2 className="contact-page__footer-front-text">
                Furniture Design | CAD | 3D Rendering
              </h2>
              <div className="contact-page__red-line-wrap">
                <span
                  className={`red-line ${isLineInView ? "side-in" : ""} `}
                  ref={lineRef}
                ></span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

const ContactPageWithTransition = pageTransition(ContactPage);

export default ContactPageWithTransition;
