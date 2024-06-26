import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../../components/common/Button";
import { Loader } from "../../components/common/Loader";
import { FormCheckbox } from "../../components/common/formElements/formCheckbox";
import { FormFieldset } from "../../components/common/formElements/formFieldset";
import { FormInputText } from "../../components/common/formElements/formInputText";
import { FormRadioButton } from "../../components/common/formElements/formRadioButton";
import Layout from "../../components/layout/Layout";
import { createNewAdvert, loadTags, uiResetError } from "../../store/actions";
import { getAllTags, getError, getPending } from "../../store/selectors";
import "./newAdvertPage.css";

export function NewAdvertPage() {
  const dispatch = useDispatch();
  const resetError = () => dispatch(uiResetError());
  const error = useSelector(getError);
  const isLoading = useSelector(getPending);

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    sale: false,
    tags: [],
    photo: null,
  });
  const inputFileRef = useRef();
  const allTags = useSelector(getAllTags);

  useEffect(() => {
    dispatch(loadTags());
  }, [dispatch]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (inputFileRef.current.files.length > 0) {
      const uploadedFile = inputFileRef.current.files[0];
      const allowedFormats = ["image/jpeg", "image/png"];

      if (allowedFormats.includes(uploadedFile.type)) {
        formData.photo = uploadedFile;
      } else {
        setIsLoading(false);
        throw new Error("Invalid file format. Only JPEG and PNG images are allowed.");
      }
    }
    await dispatch(createNewAdvert(formData));
  };

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    if (type === "checkbox") {
      if (checked) {
        setFormData({ ...formData, tags: [...formData.tags, value] });
      } else {
        setFormData({ ...formData, tags: formData.tags.filter((tag) => tag !== value) });
      }
    } else if (type === "radio") {
      setFormData({ ...formData, [name]: value === "true" });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const buttonDisabled = !formData.name || !formData.price || formData.tags.length === 0;

  return (
    <Layout title="Create New Advert" page="createAdvert" showTitle>
      {isLoading && <Loader />}
      <form id="listing-creation-form" className="create-advert__form" onSubmit={handleSubmit} encType="multipart/form-data">
        <p>
          <label className="form__label" htmlFor="name">
            Nombre
          </label>
          <FormInputText onChange={handleChange} className="form__inputfield" id="name" name="name" value={formData.name} required />
        </p>
        <p>
          <label className="form__label" htmlFor="price">
            Precio
          </label>
          <FormInputText onChange={handleChange} className="form__inputfield" type="number" id="price" name="price" value={formData.price} required />
        </p>
        <FormFieldset className="form__options" labelText="Tipo de anuncio">
          <FormRadioButton onChange={handleChange} type="radio" id="venta" name="sale" value={true} checked={formData.sale === true} />
          <FormRadioButton onChange={handleChange} type="radio" id="compra" name="sale" value={false} checked={formData.sale === false} />
        </FormFieldset>
        <p>
          <label className="form__label" htmlFor="photo">
            Foto{" "}
          </label>
          <input className="form__inputfield" type="file" ref={inputFileRef} id="photo" name="photo" accept="image/png, image/jpeg" />
        </p>
        <FormFieldset className="form__options" labelText="Tags">
          {allTags.map((tag) => (
            <FormCheckbox key={tag} id={tag} labelText={tag} name="tags" value={tag} onChange={handleChange} />
          ))}
        </FormFieldset>
        <Button className="form__button" type="submit" disabled={buttonDisabled}>
          Crear anuncio
        </Button>
        {error && (
          <div className="error-message" onClick={resetError}>
            ERROR {error.status}: {error.message}
          </div>
        )}
      </form>
    </Layout>
  );
}
