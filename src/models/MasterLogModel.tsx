import { Timestamp } from "firebase/firestore";

type ACTION_TYPES = "CREATE" | "UPDATE" | "DELETE";

type ENTITY_TYPES = "PRODUCT" | "CATEGORY" | "TRANSACTION";

export interface LogModel {
  id: string;
  userId: string;
  actionType: ACTION_TYPES;
  entityType: ENTITY_TYPES;
  entityId: string;
  details: string;
  ipAddress: string;
  userAgent: string;
  timestamp: Timestamp;
}
