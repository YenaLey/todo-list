declare interface ListType {
  item: BaseResponse;
  setIsEdit: React.Dispatch<React.SetStateAction<boolean>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}
