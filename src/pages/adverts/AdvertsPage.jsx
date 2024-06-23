import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import AdvertListItem from "../../components/adverts/AdvertListItem";
import EmptyList from "../../components/adverts/EmptyList";
import { Button } from "../../components/common/Button";
import { Loader } from "../../components/common/Loader";
import { FormCheckbox } from "../../components/common/formElements/formCheckbox";
import { FormInputText } from "../../components/common/formElements/formInputText";
import { FormSelect } from "../../components/common/formElements/formSelect";
import Layout from "../../components/layout/Layout";

import { clearFilters, loadAdverts, loadTags, uiResetError, updateFilters } from "../../store/actions";
import { getAllAdverts, getAllTags, getError, getFilters, getPending } from "../../store/selectors";

import "./advertsPage.css";

export function AdvertsPage() {
  const dispatch = useDispatch();
  const resetError = () => dispatch(uiResetError());
  const error = useSelector(getError);
  const isLoading = useSelector(getPending);

  const adverts = useSelector(getAllAdverts);
  const allTags = useSelector(getAllTags);
  const filters = useSelector(getFilters) || { name: "", tags: [], sale: "all" };

  useEffect(() => {
    dispatch(loadAdverts());
    dispatch(loadTags());
  }, [dispatch]);

  const applyFilters = (filters, adverts) => {
    let filteredAdverts = adverts;

    if (filters.name) {
      filteredAdverts = filteredAdverts.filter((advert) => advert.name.toLowerCase().startsWith(filters.name.toLowerCase()));
    }

    if (filters.sale !== "all") {
      filteredAdverts = filteredAdverts.filter((advert) => advert.sale.toString() === filters.sale);
    }

    if (filters.tags.length > 0) {
      filteredAdverts = filteredAdverts.filter((advert) => filters.tags.every((tag) => advert.tags.includes(tag)));
    }

    return filteredAdverts;
  };

  const handleChange = (event) => {
    const { name, value, checked } = event.target;
    let updatedFilters = { ...filters };

    if (name === "tags") {
      if (value === "") {
        updatedFilters.tags = [];
      } else {
        updatedFilters.tags = checked ? [...updatedFilters.tags, value] : updatedFilters.tags.filter((tag) => tag !== value);
      }
    } else {
      updatedFilters[name] = value;
    }

    dispatch(updateFilters(updatedFilters));
  };

  const handleClear = (event) => {
    event.preventDefault();
    dispatch(clearFilters());
  };

  let filteredAdverts = filters ? applyFilters(filters, adverts) : adverts;

  return (
    <Layout page="adverts">
      <div className="adverts__filter">
        <form>
          <FormInputText name="name" value={filters.name} onChange={handleChange} />
          <FormSelect name="sale" value={filters.sale} onChange={handleChange} options={{ all: "All", true: "For sale", false: "Wanted" }} />
          <div className="tag__options">
            <FormCheckbox key="any" id="any" labelText="any tag" name="tags" value="" checked={filters.tags.length === 0} onChange={handleChange} />
            {allTags.map((tag) => (
              <FormCheckbox key={tag} id={tag} labelText={tag} name="tags" value={tag} checked={filters.tags.includes(tag)} onChange={handleChange} />
            ))}
          </div>
          <Button onClick={handleClear}>Clear</Button>
        </form>
      </div>
      {isLoading && <Loader />}
      {adverts.length ? (
        <div>
          {filteredAdverts.length > 0 ? (
            <ul className="adverts__list">
              {filteredAdverts.map(({ id, ...advert }) => (
                <AdvertListItem key={id} id={id} {...advert} />
              ))}
            </ul>
          ) : (
            !isLoading && (
              <EmptyList title="No ads found with these filters">
                <p>(Try removing some)</p>
              </EmptyList>
            )
          )}
        </div>
      ) : (
        <>
          {error && (
            <div className="error-message" onClick={resetError}>
              ERROR {error.status}: {error.message}
            </div>
          )}
          {!isLoading && (
            <EmptyList title="It seems like there are no ads yet!">
              <p>What do you think about creating one?</p>
              <Link to="/adverts/new" className="button__link">
                Create advert
              </Link>
            </EmptyList>
          )}
        </>
      )}
    </Layout>
  );
}
