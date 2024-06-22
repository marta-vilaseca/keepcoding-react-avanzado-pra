import { render } from "@testing-library/react";
import EmptyList from "../EmptyList";

const title = "No Adverts Found";
const message = "There are currently no adverts to display.";

test("renders EmptyList correctly", () => {
  const { container } = render(<EmptyList title={title}>{message}</EmptyList>);

  // Use toMatchInlineSnapshot to save the snapshot inline
  expect(container.innerHTML).toMatchInlineSnapshot(
    `"<div class="empty__container"><div class="empty__results"><h2>Oops!</h2><h3>${title}</h3><div class="empty__message">${message}</div></div></div>"`
  );
});
