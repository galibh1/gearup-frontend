"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { changeUserStatus } from "../_actions/admin.actions";

type User = {
    id: string;
    name: string;
    email: string;
    role: string;
    activeStatus: string;
};

export default function UserTable({
    users,
}: {
    users: User[];
}) {
    const router = useRouter();

    const [loadingId, setLoadingId] =
        useState<string | null>(null);

    async function handleStatus(
        id: string,
        status: string
    ) {
        try {
            setLoadingId(id);

            const result =
                await changeUserStatus(id, status);

            if (!result.success) {
                toast.error(
                    result.message ||
                    "Failed to update user status"
                );

                return;
            }

            toast.success(
                status === "ACTIVE"
                    ? "User activated successfully"
                    : "User suspended successfully"
            );

            router.refresh();
        } catch {
            toast.error(
                "Something went wrong. Please try again."
            );
        } finally {
            setLoadingId(null);
        }
    }

    return (
        <div
            className="
            rounded-2xl
            border
            bg-white
            p-6
            shadow-sm
            "
        >
            <div
                className="
                mb-5
                flex
                items-center
                justify-between
                "
            >
                <h2
                    className="
                    text-xl
                    font-bold
                    "
                >
                    Users
                </h2>

                <span
                    className="
                    rounded-full
                    bg-blue-50
                    px-3
                    py-1
                    text-sm
                    font-medium
                    text-blue-700
                    "
                >
                    {users.length} users
                </span>
            </div>

            {users.length === 0 ? (
                <div
                    className="
                    rounded-xl
                    border
                    border-dashed
                    bg-gray-50
                    p-8
                    text-center
                    text-gray-500
                    "
                >
                    No users found.
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table
                        className="
                        w-full
                        min-w-[700px]
                        text-left
                        "
                    >
                        <thead>
                            <tr
                                className="
                                border-b
                                text-sm
                                text-gray-500
                                "
                            >
                                <th className="p-3">
                                    Name
                                </th>

                                <th className="p-3">
                                    Email
                                </th>

                                <th className="p-3">
                                    Role
                                </th>

                                <th className="p-3">
                                    Status
                                </th>

                                <th className="p-3">
                                    Action
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {users.map((user) => (
                                <tr
                                    key={user.id}
                                    className="
                                    border-b
                                    last:border-0
                                    "
                                >
                                    <td className="p-3 font-medium">
                                        {user.name}
                                    </td>

                                    <td className="p-3 text-gray-600">
                                        {user.email}
                                    </td>

                                    <td className="p-3">
                                        <span
                                            className="
                                            rounded-full
                                            bg-gray-100
                                            px-3
                                            py-1
                                            text-xs
                                            font-medium
                                            "
                                        >
                                            {user.role}
                                        </span>
                                    </td>

                                    <td className="p-3">
                                        <span
                                            className={`
                                            rounded-full
                                            px-3
                                            py-1
                                            text-xs
                                            font-medium
                                            ${
                                                user.activeStatus ===
                                                "ACTIVE"
                                                    ? "bg-green-100 text-green-700"
                                                    : "bg-red-100 text-red-700"
                                            }
                                            `}
                                        >
                                            {user.activeStatus}
                                        </span>
                                    </td>

                                    <td className="p-3">
                                        {user.activeStatus ===
                                        "ACTIVE" ? (
                                            <button
                                                type="button"
                                                disabled={
                                                    loadingId ===
                                                    user.id
                                                }
                                                onClick={() =>
                                                    handleStatus(
                                                        user.id,
                                                        "SUSPENDED"
                                                    )
                                                }
                                                className="
                                                rounded-lg
                                                bg-red-500
                                                px-3
                                                py-2
                                                text-sm
                                                font-medium
                                                text-white
                                                transition
                                                hover:bg-red-600
                                                disabled:cursor-not-allowed
                                                disabled:opacity-50
                                                "
                                            >
                                                {loadingId ===
                                                user.id
                                                    ? "Updating..."
                                                    : "Suspend"}
                                            </button>
                                        ) : (
                                            <button
                                                type="button"
                                                disabled={
                                                    loadingId ===
                                                    user.id
                                                }
                                                onClick={() =>
                                                    handleStatus(
                                                        user.id,
                                                        "ACTIVE"
                                                    )
                                                }
                                                className="
                                                rounded-lg
                                                bg-green-600
                                                px-3
                                                py-2
                                                text-sm
                                                font-medium
                                                text-white
                                                transition
                                                hover:bg-green-700
                                                disabled:cursor-not-allowed
                                                disabled:opacity-50
                                                "
                                            >
                                                {loadingId ===
                                                user.id
                                                    ? "Updating..."
                                                    : "Activate"}
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}