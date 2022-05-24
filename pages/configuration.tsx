import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { SALEOR_DOMAIN_HEADER } from "../constants";
import { useFetchAllCheckoutsQuery } from "../generated/graphql";
import useApp from "../hooks/useApp";

const Configuration: NextPage = () => {
  const appState = useApp()?.getState();

  const [configuration, setConfiguration] = useState(null);
  const [{ data, error, fetching }] = useFetchAllCheckoutsQuery();
  console.log(configuration);
  useEffect(() => {
    appState?.domain &&
      appState?.token &&
      fetch("/api/configuration", {
        headers: [
          [SALEOR_DOMAIN_HEADER, appState.domain],
          ["authorization-bearer", appState.token!],
        ],
      })
        .then((res) => res.json())
        .then(({ data }) => setConfiguration(data));
  }, [appState]);

  if (fetching) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <div>
      <main>
        <div>Saleor App Template - Configuration</div>
        <div>{appState?.domain}</div>
        <div>{JSON.stringify(data?.checkouts)}</div>
        <div>{JSON.stringify(configuration)}</div>
      </main>
    </div>
  );
};

export default Configuration;
