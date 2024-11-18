import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "../types/userInvite";
import { useRolesActions, useRolesState } from "@frontegg/react";

interface UserFormProps {
  addUser: (user: User) => void;
}

const userSchema = z.object({
  email: z.string().email("Invalid email format"),
  name: z.string().min(1, "Name is required"),
  roleIds: z
    .string()
    .transform((val) => val.split(",").map((id) => id.trim()))
    .refine((val) => val.every((id) => id.length > 0), {
      message: "Each role ID must be a non-empty string",
    }),
});

type UserFormData = z.infer<typeof userSchema>;

const UserForm: React.FC<UserFormProps> = ({ addUser }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
  });

  const [showForm, setShowForm] = useState(true);
  const { loadRolesAndPermissions } = useRolesActions();
  const { roles } = useRolesState();
  const [selectedRole, setSelectedRole] = useState<string | undefined>();

  useEffect(() => {
    loadRolesAndPermissions();
  }, []);

  const onSubmit = (data: UserFormData) => {
    addUser(data);
    reset();
    setShowForm(false);
  };

  return showForm ? (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="input-container">
        <label>Email:</label>
        <input type="email" {...register("email")} />
        {errors.email && <p>{errors.email.message}</p>}
      </div>

      <div className="input-container">
        <label>Name:</label>
        <input type="text" {...register("name")} />
        {errors.name && <p>{errors.name.message}</p>}
      </div>

      <div className="input-container">
        <label>Role</label>
        <select
          style={{ marginLeft: "1rem" }}
          id="roleDropdown"
          value={selectedRole}
          {...register("roleIds")}
          onChange={(e) => setSelectedRole(e.target.value)}
        >
          <option value={""}>Select option</option>
          {roles.map((role) => (
            <option key={role.id} value={role.id}>
              {role.name}
            </option>
          ))}
        </select>
        {errors.roleIds && <p>{errors.roleIds.message}</p>}
      </div>

      <button type="submit">Add user</button>
    </form>
  ) : (
    <button onClick={() => setShowForm(true)}>+</button>
  );
};

export default UserForm;
