import * as api from '../utils/api';

export function groupRouteData(data: api.group.GroupHandle | api.group.GroupSummary): { id: string } {
	return {
		id: data.groupId
	};
}
