"use client";
import dynamic from "next/dynamic";
import LoadingSpinner from "./LoadingSpinner";

const ClientPortfolio = dynamic(() => import("./ClientPortfolio"), {
  ssr: false,
  loading: () => <LoadingSpinner />,
});

export default function ClientPortfolioWrapper(props: any) {
  return <ClientPortfolio {...props} />;
}