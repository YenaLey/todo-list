declare interface ListType {
  item: BaseResponse;
  setIsEdit: React.Dispatch<React.SetStateAction<boolean>>;
  onRemove: (number) => void;
}
