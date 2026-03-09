interface isTooLongTextProps {
  description: string;
  limit: number;
}

export const isTooLongText = ({
  description,
  limit,
}: isTooLongTextProps): boolean => {
  return description.length > limit;
};
