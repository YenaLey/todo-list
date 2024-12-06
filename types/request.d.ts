declare interface AddItemRequest {
  name: string;
}

declare interface PaginationRequest {
  page: number;
  pageSize: number;
}

declare interface ItemRequest {
  itemId: number;
}

declare interface EditItemRequest extends ItemRequest {
  name?: string;
  memo?: string;
  imageUrl?: string;
  isCompleted?: boolean;
}

declare interface ApiResponse<T> {
  status: number;
  data: T;
}
