"use client";
import dynamic from "next/dynamic";
import LoadingSpinner from "./LoadingSpinner";

const VirtualPortfolio = dynamic(() => import("./VirtualPortfolio"), {
  ssr: false,
  loading: () => <LoadingSpinner />,
});

export default function ClientPortfolioWrapper(props: any) {
  return <VirtualPortfolio {...props} />;
}