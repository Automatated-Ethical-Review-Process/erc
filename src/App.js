import ThemeContextProvider from "context/ThemeContext";
import AppRoutes from "routes";

function App() {
   return (
      <ThemeContextProvider>
         <AppRoutes />
      </ThemeContextProvider>
   );
}

export default App;
