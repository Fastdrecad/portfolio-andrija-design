import { useRef } from "react";

import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { setFormSubmitted } from "@/redux/contactSlice";
import useContactForm from "@/hooks/useContactForm";
import contactService from "@/services/contactService";

import Button from "@/components/common/Button";
import FormInput from "@/components/common/FormInput";

import { inputs } from "@/data";

const ContactForm: React.FC = () => {
  const formContentRef = useRef<HTMLDivElement>(null);
  const {
    values,
    handleChange,
    isFormValidState,
    loading,
    setLoading,
    responseMessage,
    setResponseMessage
  } = useContactForm();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isFormValidState) {
      setResponseMessage("Please fill in all fields correctly.");
      return;
    }

    setLoading(true);
    setResponseMessage(null);

    try {
      await contactService.sendMessage(values);
      setResponseMessage("Your message has been sent successfully!");

      // Set form submitted state and navigate
      dispatch(setFormSubmitted(true));
      navigate("/success");
    } catch (error) {
      setResponseMessage("There was an error sending your message.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="contact-form__container"
      ref={formContentRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <motion.form
        className="contact-form__form"
        onSubmit={handleSubmit}
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.75, duration: 0.5, ease: "easeInOut" }}
      >
        {inputs.map((input) => (
          <FormInput
            key={input.id}
            {...input}
            value={values[input.name as keyof typeof values]}
            onChange={handleChange}
          />
        ))}
        <Button
          variant="secondary"
          loading={loading}
          disabled={!isFormValidState}
          className="contact-form__btn-send"
        >
          {loading ? "SENDING..." : "SEND"}
        </Button>

        {responseMessage && (
          <p className="contact-form__response-message">{responseMessage}</p>
        )}
      </motion.form>
    </motion.div>
  );
};

export default ContactForm;
