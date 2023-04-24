import { useQuery } from "@tanstack/react-query";
import Axios from "axios";

const FactPage = () => {
	const { data } = useQuery(["catFact"], () => {
		return Axios.get("https://catfact.ninja/fact").then((res) => res.data);
	});
	return <div>{data?.fact}</div>;
};
export default FactPage;
