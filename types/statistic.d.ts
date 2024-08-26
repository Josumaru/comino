type Statistic = {
  comments: StatisticsDetailsCommentsSchema;
  rating: Required<{
    average: number | null;
    bayesian: number;
  }>;
  follows: number;
};
