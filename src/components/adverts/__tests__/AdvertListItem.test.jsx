import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import AdvertListItem from "../AdvertListItem";

const advert = {
  id: "1",
  name: "Example Advert",
  price: 100,
  sale: true,
  photo: "example-photo.jpg",
  tags: ["tag1", "tag2"],
};

test("renders AdvertListItem correctly", () => {
  const { container } = render(
    <MemoryRouter>
      <AdvertListItem {...advert} />
    </MemoryRouter>
  );

  const snapshot = container.innerHTML;

  expect(snapshot).toMatchSnapshot(`
    "<li class="advert__card"><span class="card__price">100€</span><div class="card__info"><span class="card__sale">For sale</span><h3 class="card__title"><a href="/adverts/1">Example Advert</a></h3></div><div class="card__photo"><a href="/adverts/1"><img alt="Example Advert" src="example-photo.jpg"></a></div><ul class="card__tags"><li class="card__tag">tag1</li><li class="card__tag">tag2</li></ul></li>"
  `);
});
