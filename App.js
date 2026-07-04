import {ThemeProvider} from "./contexts/ThemeContext";
import MainNavigator from "./components/MainNavigator";

export default function App() {
      return (
          <ThemeProvider>
            <MainNavigator />
          </ThemeProvider>
      );
}