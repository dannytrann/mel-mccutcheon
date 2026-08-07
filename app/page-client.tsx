"use client";

import { useTina } from "tinacms/dist/react";
import HomePage from "@/components/HomePage";
import type { HomepageQuery, HomepageQueryVariables } from "@/tina/__generated__/types";

export default function PageClient(props: {
  query: string;
  variables: HomepageQueryVariables;
  data: HomepageQuery;
}) {
  const { data } = useTina<HomepageQuery>({
    query: props.query,
    variables: props.variables,
    data: props.data,
  });

  return <HomePage data={data.homepage} />;
}
