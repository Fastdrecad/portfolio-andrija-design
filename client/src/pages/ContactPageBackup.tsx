import { useEffect, useRef, useState, FormEvent, ChangeEvent } from "react";
import { motion, useInView } from "framer-motion";
import { useNavigate } from "react-router-dom";
import emailjs from "@emailjs/browser";
import contactHeroImg from "/contact-hero.jpg";
import pageTransition from "@components/pageTransition";
import { useDispatch } from "react-redux";
import { setCurrentRoute } from "../redux/routeSlice";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  message: string;
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  message?: string;
}

const ContactPage: React.FC = () => {
  useEffect(() => {
    document.title = "Contact | andrija-micunovic-design";
    return () => {
      document.title = "Default Title";
    };
  }, []);

  const navigate = useNavigate();

  const titleRef = useRef<HTMLDivElement>(null);
  const isTitleInView = useInView(titleRef);
  const formContentRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLSpanElement>(null);
  const isLineInView = useInView(lineRef);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const refContainer = useRef<HTMLInputElement>(null);

  const dispatch = useDispatch();

  const adjustHeight = () => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
  };

  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    message: ""
  });

  const [status, setStatus] = useState<
    "success" | "error" | "loading" | "idle"
  >("idle");

  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [responseMsg, setResponseMsg] = useState<string>("");

  useEffect(() => {
    adjustHeight();
  }, []);

  useEffect(() => {
    refContainer.current?.focus();
  }, []);
  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));
    adjustHeight();
  };

  const validateForm = (): FormErrors => {
    const errors: FormErrors = {};
    if (!formData.firstName.trim()) {
      errors.firstName = "First Name is required.";
    }
    if (!formData.lastName.trim()) {
      errors.lastName = "Last Name is required.";
    }
    if (!formData.email.trim()) {
      errors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email.trim())) {
      errors.email = "Email is invalid.";
    }

    if (!formData.message.trim()) {
      errors.message = "Message is required.";
    }
    return errors;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(formData);
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    console.log(formData);

    setStatus("loading");

    emailjs
      .sendForm(
        "service_g788tme",
        "template_w7u6qtb",
        formRef.current!,
        "Fj7G3Ji2yq_cho6WY"
      )
      .then(
        (result) => {
          console.log(result.text);
          dispatch(setCurrentRoute("/success"));
          navigate("/success");
          setFormData({
            firstName: "",
            lastName: "",
            email: "",
            message: ""
          });
          setFormErrors({});
          setStatus("success");
          setResponseMsg("Message successfully sent!");
        },
        (error) => {
          console.error("EmailJS Error:", error.text);
          setStatus("error");
          setResponseMsg("Failed to send message. Please try again later.");
        }
      );
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      formRef.current?.dispatchEvent(new Event("submit", { cancelable: true }));
    }
  };

  return (
    <section className="contact-page">
      <div className="contact-page__header">
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeIn" }}
          style={{ margin: "60px 0 0" }}
        >
          <div className="contact-page__title-container">
            <h2>Contact Me</h2>
            <p className="contact-page__form-subtitle">
              Let's start the conversation. <br /> Share more about your company
              and future business goals.
            </p>
          </div>
        </motion.div>
        <div className="contact-page__header-logo-container"></div>
        <motion.div
          className="contact-page__form-container"
          ref={formContentRef}
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1
          }}
          transition={{ duration: 1 }}
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
            <div className="contact-page__form-row">
              <input
                type="text"
                className="contact-page__form-input"
                id="firstName"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
                ref={refContainer}
                required
                onKeyDown={handleKeyPress}
              />
            </div>
            {formErrors.firstName && (
              <p className="contact-page__error-message">
                {formErrors.firstName}
              </p>
            )}
            <div className="contact-page__form-row">
              <input
                type="text"
                className="contact-page__form-input"
                id="lastName"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
                disabled={status === "loading"}
                ref={refContainer}
                required
                onKeyDown={handleKeyPress}
              />
            </div>
            {formErrors.lastName && (
              <p className="contact-page__error-message">
                {formErrors.lastName}
              </p>
            )}

            <div className="contact-page__form-row">
              <input
                type="email"
                className="contact-page__form-input"
                id="email"
                name="email"
                placeholder="Email"
                required
                onKeyDown={handleKeyPress}
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            {formErrors.email && (
              <p className="contact-page__error-message">{formErrors.email}</p>
            )}

            <div className="contact-page__form-row">
              <textarea
                className="contact-page__form-input contact-page__form-textarea auto-resize-textarea"
                name="message"
                placeholder="Message"
                value={formData.message}
                onChange={handleChange}
                required
                ref={textareaRef}
              />
              {formErrors.email && (
                <p className="contact-page__error-message">
                  {formErrors.email}
                </p>
              )}
            </div>

            <button
              className="contact-page__btn-send"
              type="submit"
              disabled={status === "loading"}
            >
              Send
            </button>

            {responseMsg && (
              <p className={`contact-page__response-message ${status}`}>
                {responseMsg}
              </p>
            )}
          </motion.form>
        </motion.div>
      </div>

      <div className="contact-page__footer-wrapper">
        <div className="contact-page__footer">
          <div className="contact-page__image-container">
            <div className="contact-page__background-image">
              <img
                src={contactHeroImg}
                alt="chair mock up"
                className="contact-page__background-image-src"
                loading="lazy"
              />
            </div>
            <motion.div
              ref={titleRef}
              className="contact-page__footer-front-title"
              initial={{ opacity: 0, filter: "blur(60px)" }}
              animate={isTitleInView ? { opacity: 1, filter: "blur(0px)" } : {}}
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
