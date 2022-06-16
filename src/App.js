import ThemeContextProvider from "context/ThemeContext";
import AppRoutes from "routes";

import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

function App() {
   return (
      <ThemeContextProvider>
         <AppRoutes />
      </ThemeContextProvider>
   );
}

export default App;
