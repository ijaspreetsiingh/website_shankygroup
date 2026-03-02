 

// menu data 
const menu_data = [
  {
    id: 1,
    title: "Home",
    link: "#",
    has_dropdown: true, 
    sub_menus: [
      { link: "/",                     title: "Home Page 01" },
      { link: "/home-2",               title: "Home Page 02" },
      { link: "/home-3",               title: "Home Page 03" },
      { link: "/home-4",               title: "Home Page 04" },
    ],
  },
  {
    id: 2,
    title: "About Us",
    link: "#",
    has_dropdown: true, 
    sub_menus: [
      { link: "/about",                title: "About Us" },
      { link: "/team",                 title: "Our Team" },
      { link: "/team-details",         title: "Team Details" },
      { link: "/pricing",              title: "Pricing Plan" },
      { link: "/faq",                  title: "Our FAQ" },
      { link: "/error",                title: "404 Error" },
    ],
  },
  {
    id: 3,
    title: "Services",
    link: "#",
    has_dropdown: true, 
    sub_menus: [
      { link: "/service",              title: "Our Services" },
      { link: "/service-details",      title: "Service Details" },
    ],
  },
  {
    id: 4,
    title: "Portfolio",
    link: "#",
    has_dropdown: true, 
    sub_menus: [
      { link: "/portfolio",            title: "Portfolio" },
      { link: "/portfolio-details",     title: "Portfolio Details" },
    ],
  },
  {
    id: 5,
    title: "Blog & News",
    link: "#",
    has_dropdown: true, 
    sub_menus: [
      { link: "/blog",                 title: "Our Blog" },
      { link: "/blog-2",               title: "Blog Standard" },
      { link: "/blog-details",         title: "Blog Details" },
    ],
  }, 
  {
    id: 6,
    title: "Contact",
    link: "/contact",
    has_dropdown: false,     
  },  
];
export default menu_data;
