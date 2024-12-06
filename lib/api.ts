import axios from "@/lib/axiosConfig";

// 새로운 아이템 추가
/**
 * 새로운 아이템을 추가합니다.
 * @param name - 추가할 아이템의 이름.
 * @returns 생성된 아이템의 세부 정보.
 */
export const addItem = async ({
  name,
}: AddItemRequest): Promise<ApiResponse<ItemResponse>> => {
  const response = await axios.post(`/items`, { name });

  const { status, data } = response;
  return { status, data };
};

// 아이템 목록 가져오기
/**
 * 페이지네이션을 사용하여 아이템 목록을 가져옵니다.
 * @param page - 가져올 페이지 번호.
 * @param pageSize - 한 페이지에 포함될 아이템 수.
 * @returns 아이템 목록과 관련된 메타데이터.
 */
export const getList = async ({
  page,
  pageSize,
}: PaginationRequest): Promise<ApiResponse<BaseResponse[]>> => {
  const response = await axios.get(`/items?page=${page}&pageSize=${pageSize}`);

  const { status, data } = response;
  return { status, data };
};

// 특정 아이템 상세 정보 가져오기
/**
 * 특정 ID를 가진 아이템의 상세 정보를 가져옵니다.
 * @param itemId - 조회할 아이템의 ID.
 * @returns 해당 아이템의 세부 정보.
 */
export const getItem = async ({
  itemId,
}: ItemRequest): Promise<ApiResponse<ItemResponse>> => {
  const response = await axios.get(`/items/${itemId}`);

  const { status, data } = response;
  return { status, data };
};

// 아이템 수정
/**
 * 특정 ID를 가진 아이템의 정보를 수정합니다.
 * @param itemId - 수정할 아이템의 ID.
 * @param name - (선택) 새로운 이름.
 * @param memo - (선택) 새로운 메모.
 * @param imageUrl - (선택) 새로운 이미지 URL.
 * @param isCompleted - (선택) 수정할 완료 상태.
 * @returns 수정된 아이템의 세부 정보.
 */
export const editItem = async ({
  itemId,
  name,
  memo,
  imageUrl,
  isCompleted,
}: EditItemRequest): Promise<ApiResponse<ItemResponse>> => {
  // 수정할 데이터를 포함된 값만으로 구성
  const updatedData: Partial<EditItemRequest> = {
    ...(name && { name }),
    ...(memo && { memo }),
    ...(imageUrl && { imageUrl }),
    ...(isCompleted !== undefined && { isCompleted }),
  };

  const response = await axios.patch(`/items/${itemId}`, updatedData);

  const { status, data } = response;
  return { status, data };
};

// 아이템 삭제
/**
 * 특정 ID를 가진 아이템을 삭제합니다.
 * @param itemId - 삭제할 아이템의 ID.
 * @returns 삭제 성공 여부 상태.
 */
export const deleteItem = async ({
  itemId,
}: ItemRequest): Promise<ApiResponse<any>> => {
  const response = await axios.delete(`/items/${itemId}`);

  const { status, data } = response;
  return { status, data };
};

// 이미지 업로드 및 URL 가져오기
/**
 * 이미지를 업로드하고 해당 이미지의 URL을 반환합니다.
 * @param imageFile - 업로드할 이미지 파일.
 * @returns 업로드된 이미지의 URL.
 */
export const getImageUrl = async ({
  imageFile,
}: {
  imageFile: File;
}): Promise<ApiResponse<ImageUrlResponse>> => {
  const formData = new FormData();
  formData.append("image", imageFile);

  const response = await axios.post(`/images/upload`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  const { status, data } = response;
  return { status, data };
};
