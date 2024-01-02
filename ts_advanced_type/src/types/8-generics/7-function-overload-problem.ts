interface CustomerPermissions {
  actions: string[];
}

interface EmployeePermissions extends CustomerPermissions {
  tasks: string[];
}

interface ManagerPermissions extends EmployeePermissions {
  approvals: string[];
}

function getPermissions(role: "manager"): ManagerPermissions;
function getPermissions(role: "employee"): EmployeePermissions;
function getPermissions(role: string): CustomerPermissions {
  switch (role) {
    case "manager":
      return {
        approvals: [],
        tasks: [],
        actions: [],
      };
    case "employee":
      return {
        tasks: [],
        actions: [],
      };
    default:
      return {
        actions: [],
      };
  }
}

export {};
