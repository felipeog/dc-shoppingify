type TQueryContainerProps = {
  children: React.ReactNode;
  isLoading?: boolean;
  error?: Error | null;
};

export function QueryContainer(props: TQueryContainerProps) {
  if (props.isLoading) {
    return <p>Loading...</p>;
  }

  if (props.error) {
    return <p>Error: {props.error.message}</p>;
  }

  return props.children;
}
