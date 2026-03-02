import { createBrowserRouter, RouterProvider } from "react-router-dom"; 
import HomeOne from "./components/homes/home-1";
import HomeTwo from "./components/homes/home-2";
import HomeThree from "./components/homes/home-3";
import HomeFour from "./components/homes/home-4";
import About from "./components/about";
import Team from "./components/team";
import TeamDetails from "./components/team-details";
import Pricing from "./components/pricing";
import Faq from "./components/faq";
import NotFound from "./error";
import Service from "./components/service";
import ServiceDetails from "./components/service-details";
import Portfolio from "./components/portfolio";
import PortfolioDetails from "./components/portfolio-details";
import Blog from "./components/blog";
import BlogTwo from "./components/blog-2";
import BlogDetails from "./components/blog-details";
import Contact from "./components/contact";
import AboutUs from "./components/homes/home-4/who_we_are/AboutUs";
import Leadership from "./components/homes/home-4/who_we_are/Leadership";
import MissionVision from "./components/homes/home-4/who_we_are/MissionVision";
 

const router = createBrowserRouter([
	{ path: "/home-4", element: <HomeOne /> }, 
	{ path: "/home-2", element: <HomeTwo /> }, 
	{ path: "/home-3", element: <HomeThree /> }, 
	{ path: "/", element: <HomeFour /> }, 
	{ path: "/about", element: <About /> }, 
	{ path: "/team", element: <Team /> }, 
	{ path: "/team-details", element: <TeamDetails /> }, 
	{ path: "/pricing", element: <Pricing /> }, 
	{ path: "/faq", element: <Faq /> }, 
	{ path: "/service", element: <Service /> }, 
	{ path: "/service-details", element: <ServiceDetails /> }, 
	{ path: "/portfolio", element: <Portfolio /> }, 
	{ path: "/portfolio-details", element: <PortfolioDetails /> }, 
	{ path: "/blog", element: <Blog /> }, 
	{ path: "/blog-2", element: <BlogTwo /> }, 
	{ path: "/blog-details", element: <BlogDetails /> }, 
	{ path: "/contact", element: <Contact /> },
	{ path: "/about-us", element: <AboutUs /> },
	{ path: "/leadership", element: <Leadership /> },
	{ path: "/mission-vision", element: <MissionVision /> },


//  not found page
{ path: "*", element: <NotFound /> },
	  
]);

function App() {
 



	return (
		<>
			<RouterProvider router={router} />
		</>
	);
}

export default App;
