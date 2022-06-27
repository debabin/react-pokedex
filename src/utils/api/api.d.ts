interface RequestQueryParams<T> {
  params: T;
  config?: import('react-query').QueryObserverOptions<any, any, any, any, any>;
}
