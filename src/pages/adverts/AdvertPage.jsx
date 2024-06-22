import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import defaultPhoto from "../../assets/no-photo.png";
import { ConfirmationButton } from "../../components/common/ConfirmationButton";
import { Loader } from "../../components/common/Loader";
import Layout from "../../components/layout/Layout";

import { useDispatch, useSelector } from "react-redux";
import { deleteSingleAdvert, loadSingleAdvert, uiResetError } from "../../store/actions";
import { getAdvertByID, getError, getPending } from "../../store/selectors";
import "./advertpage.css";

export function AdvertPage() {
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);

  const dispatch = useDispatch();
  const resetError = () => {
    dispatch(uiResetError());
    setShowConfirmDelete(false);
  };
  const error = useSelector(getError);
  const isLoading = useSelector(getPending);
  const { id } = useParams();

  const advert = useSelector((state) => getAdvertByID(id)(state));

  useEffect(() => {
    if (id) {
      dispatch(loadSingleAdvert(id));
    }
  }, [dispatch, id]);

  const handleDelete = async () => {
    dispatch(deleteSingleAdvert(id));
  };

  return (
    <>
      {isLoading && (
        <Layout page="individual">
          <Loader />
        </Layout>
      )}
      {advert && (
        <Layout title={advert.name} page="individual" showTitle>
          {error && (
            <div className="error-message" onClick={resetError}>
              ERROR {error.status}: {error.message}
            </div>
          )}
          <div className="advert__individual">
            <ConfirmationButton
              buttonClassName="button__delete"
              buttonText="Delete ad"
              dialogText="Are you sure you want to delete this ad?"
              confirmAction={handleDelete}
              confirmActionText="delete"
              cancelActionText="cancel"
              error={error}
            />
            <div className="adv__ind__details">
              <p className="adv__ind__sale">{advert.sale ? "Venta" : "Compra"}</p>
              <ul className="adv__ind__tags">
                {advert.tags.map((tag) => (
                  <li key={tag} className="card__tag">
                    {tag}
                  </li>
                ))}
              </ul>
              <p className="adv__ind__price card-price">{advert.price}&euro;</p>
            </div>
            <div className="adv__ind__photo">
              {advert.photo ? <img src={advert.photo} alt={advert.name} style={{ maxWidth: "100%" }} /> : <img src={defaultPhoto} alt="No photo provided" style={{ maxWidth: "100%" }} />}
            </div>
          </div>
        </Layout>
      )}
    </>
  );
}
