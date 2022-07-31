type RequestParams<Params> = Params;

interface RequestMutationSettings<Func = {}> {
  config?: import('axios').AxiosRequestConfig;
  options?: import('react-query').UseMutationOptions<Awaited<ReturnType<Func>>, any, any, any>;
}

interface RequestQuerySettings<Func = {}> {
  config?: import('axios').AxiosRequestConfig;
  options?: import('react-query').UseQueryOptions<
    Awaited<ReturnType<Func>>,
    any,
    Awaited<ReturnType<Func>>,
    any
  >;
}

interface RequestInfinityQuerySettings<Func = {}> {
  config?: import('axios').AxiosRequestConfig;
  options?: import('react-query').UseInfiniteQueryOptions<
    Awaited<ReturnType<Func>>,
    any,
    Awaited<ReturnType<Func>>,
    Awaited<ReturnType<Func>>,
    any
  >;
}

interface RequestQueryParams<Params = {}, Func = {}> {
  params: Params;
}

interface RequestQueryWithoutParams<Func = {}> {
  config?: import('axios').AxiosRequestConfig;
  options?: import('react-query').UseQueryOptions<
    Awaited<ReturnType<Func>>,
    any,
    Awaited<ReturnType<Func>>,
    any,
    any
  >;
}

interface RequestInfiniteQueryWithoutParams<Func = {}> {
  config?: import('axios').AxiosRequestConfig;
  options?: import('react-query').UseInfiniteQueryOptions<
    Awaited<ReturnType<Func>>,
    any,
    Awaited<ReturnType<Func>>,
    any,
    any
  >;
}
