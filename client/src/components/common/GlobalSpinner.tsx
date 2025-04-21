import { useAppSelector } from "@/store";
import "@/styles/spinner/spinner.style.css";

const GlobalSpinner = () => {
  const isLoading = useAppSelector((state) => state.loading.isLoading);

  if (!isLoading) return null;

  return (
    <div className="main-spinner">
      <div className="spinner">Loading...</div>
    </div>
  );
};

export default GlobalSpinner;
