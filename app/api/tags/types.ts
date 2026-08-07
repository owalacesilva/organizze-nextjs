export interface TagByIdResponse {
	id: number;
	name: string;
	color: string;
}

export interface TagsResponse {
	tags: TagByIdResponse[];
}

export interface CreateTagRequest {
	name: string;
	color?: string;
}

export interface CreateTagResponse {
	id: number;
}

export interface UpdateTagRequest {
	name?: string;
	color?: string;
}

export interface UpdateTagResponse {
	id: number;
}

export interface DeleteTagResponse {
	id: number;
}
