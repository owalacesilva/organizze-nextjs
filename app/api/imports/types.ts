export type ImportStatus = "processing" | "completed" | "partial" | "failed";

export interface ImportByIdResponse {
	id: number;
	fileName: string;
	totalRows: number;
	importedRows: number;
	failedRows: number;
	status: ImportStatus;
	createdAt: string;
	finishedAt: string | null;
}

export interface ImportsResponse {
	imports: ImportByIdResponse[];
}

export interface CreateImportRequest {
	fileName: string;
	totalRows: number;
	importedRows?: number;
	failedRows?: number;
	status?: ImportStatus;
}

export interface CreateImportResponse {
	id: number;
}

export interface UpdateImportRequest {
	importedRows?: number;
	failedRows?: number;
	status?: ImportStatus;
}

export interface UpdateImportResponse {
	id: number;
}

export interface DeleteImportResponse {
	id: number;
}
