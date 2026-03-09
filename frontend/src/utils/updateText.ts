interface updateTextProps {
  description: string;
  limit: number;
}

export const updateText = ({ description, limit }: updateTextProps): string => {
  return description.slice(0, limit) + "...";
};
