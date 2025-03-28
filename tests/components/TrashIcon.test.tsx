import { render } from "@testing-library/react";
import { TrashIcon } from "../../src/components/TrashIcon";

describe("TrashIcon", () => {
  it("renders without crashing", () => {
    const { container } = render(<TrashIcon />);
    expect(container.firstChild).toBeInTheDocument();
  });

  // Optionally, you could add a snapshot test
  it("matches snapshot", () => {
    const { container } = render(<TrashIcon />);
    expect(container).toMatchSnapshot();
  });
});
