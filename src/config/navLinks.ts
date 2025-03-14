export interface NavLinkType {
  name: string;
  path: string;
  protected?: boolean;
}

const navLinks: NavLinkType[] = [
  { name: "Home", path: "/" },
  { name: "Catalog", path: "/catalogGrid" },
  { name: "Categories", path: "/categories" },
  { name: "Product", path: "/product", protected: true },
  { name: "Cart", path: "/cart", protected: true },
  //   { name: "Profile", path: "/profile", protected: true },
];

export default navLinks;
