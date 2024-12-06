interface BaseResponse {
  id: number;
  name: string;
  isCompleted: boolean;
}

interface ItemResponse extends BaseResponse {
  tenantId: string;
  memo: string;
  imageUrl: string;
}

interface ImageUrlResponse {
  url: string;
}

declare interface ApiResponse<T> {
  status: number;
  data: T;
}
