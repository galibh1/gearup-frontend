"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import { toast } from "sonner";

import { changeUserStatus } from "../_actions/admin.actions";

type User = {
    id: string;
    name: string;
    email: string;
    role: string;
    activeStatus: string;
};

const USERS_PER_PAGE = 10;

export default function UserTable({
    users,
}: {
    users: User[];
}) {
    const router = useRouter();

    const [loadingId, setLoadingId] =
        useState<string | null>(null);

    const [search, setSearch] =
        useState("");

    const [currentPage, setCurrentPage] =
        useState(1);

    /*
     * Frontend search.
     *
     * The current backend endpoint returns the complete
     * user list and does not expose search parameters.
     */
    const filteredUsers = useMemo(() => {
        const query =
            search.trim().toLowerCase();

        if (!query) {
            return users;
        }

        return users.filter((user) => {
            return (
                user.name
                    ?.toLowerCase()
                    .includes(query) ||
                user.email
                    ?.toLowerCase()
                    .includes(query) ||
                user.role
                    ?.toLowerCase()
                    .includes(query) ||
                user.activeStatus
                    ?.toLowerCase()
                    .includes(query)
            );
        });
    }, [users, search]);

    const totalPages =
        Math.max(
            1,
            Math.ceil(
                filteredUsers.length /
                    USERS_PER_PAGE
            )
        );

    /*
     * Make sure the current page remains valid
     * after searching or refreshing the users.
     */
    const safeCurrentPage =
        Math.min(
            currentPage,
            totalPages
        );

    const startIndex =
        (safeCurrentPage - 1) *
        USERS_PER_PAGE;

    const paginatedUsers =
        filteredUsers.slice(
            startIndex,
            startIndex + USERS_PER_PAGE
        );

    function handleSearch(
        value: string
    ) {
        setSearch(value);
        setCurrentPage(1);
    }

    async function handleStatus(
        id: string,
        status: string
    ) {
        try {
            setLoadingId(id);

            const result =
                await changeUserStatus(
                    id,
                    status
                );

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
            {/* HEADER */}

            <div
                className="
                    mb-5
                    flex
                    flex-col
                    gap-4
                    sm:flex-row
                    sm:items-center
                    sm:justify-between
                "
            >
                <div>
                    <h2
                        className="
                            text-xl
                            font-bold
                            text-gray-900
                        "
                    >
                        Users
                    </h2>

                    <p
                        className="
                            mt-1
                            text-sm
                            text-gray-500
                        "
                    >
                        Manage platform users and account status.
                    </p>
                </div>

                <span
                    className="
                        w-fit
                        rounded-full
                        bg-blue-50
                        px-3
                        py-1
                        text-sm
                        font-medium
                        text-blue-700
                    "
                >
                    {filteredUsers.length} users
                </span>
            </div>

            {/* SEARCH */}

            <div className="mb-5">
                <div
                    className="
                        relative
                        max-w-md
                    "
                >
                    <Search
                        className="
                            pointer-events-none
                            absolute
                            left-3
                            top-1/2
                            h-4
                            w-4
                            -translate-y-1/2
                            text-gray-400
                        "
                    />

                    <input
                        type="search"
                        value={search}
                        onChange={(event) =>
                            handleSearch(
                                event.target.value
                            )
                        }
                        placeholder="
                            Search users by name, email, role or status...
                        "
                        className="
                            w-full
                            rounded-xl
                            border
                            border-gray-200
                            bg-gray-50
                            py-3
                            pl-10
                            pr-4
                            text-sm
                            text-gray-900
                            outline-none
                            transition
                            placeholder:text-gray-400
                            focus:border-gray-400
                            focus:bg-white
                            focus:ring-2
                            focus:ring-gray-100
                        "
                    />
                </div>
            </div>

            {/* EMPTY STATE */}

            {paginatedUsers.length === 0 ? (
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
                    {search.trim()
                        ? "No users match your search."
                        : "No users found."}
                </div>
            ) : (
                <>
                    {/* TABLE */}

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
                                {paginatedUsers.map(
                                    (user) => (
                                        <tr
                                            key={user.id}
                                            className="
                                                border-b
                                                last:border-0
                                            "
                                        >
                                            <td
                                                className="
                                                    p-3
                                                    font-medium
                                                    text-gray-900
                                                "
                                            >
                                                {user.name}
                                            </td>

                                            <td
                                                className="
                                                    p-3
                                                    text-gray-600
                                                "
                                            >
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
                                                        text-gray-700
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
                                                    {
                                                        user.activeStatus
                                                    }
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
                                    )
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* PAGINATION */}

                    <div
                        className="
                            mt-5
                            flex
                            flex-col
                            gap-4
                            border-t
                            pt-5
                            sm:flex-row
                            sm:items-center
                            sm:justify-between
                        "
                    >
                        <p
                            className="
                                text-sm
                                text-gray-500
                            "
                        >
                            Showing{" "}
                            <span className="font-medium text-gray-900">
                                {startIndex + 1}
                            </span>{" "}
                            to{" "}
                            <span className="font-medium text-gray-900">
                                {Math.min(
                                    startIndex +
                                        paginatedUsers.length,
                                    filteredUsers.length
                                )}
                            </span>{" "}
                            of{" "}
                            <span className="font-medium text-gray-900">
                                {filteredUsers.length}
                            </span>{" "}
                            users
                        </p>

                        <div
                            className="
                                flex
                                items-center
                                gap-2
                            "
                        >
                            <button
                                type="button"
                                disabled={
                                    safeCurrentPage ===
                                    1
                                }
                                onClick={() =>
                                    setCurrentPage(
                                        (page) =>
                                            Math.max(
                                                1,
                                                page - 1
                                            )
                                    )
                                }
                                className="
                                    inline-flex
                                    items-center
                                    gap-1
                                    rounded-lg
                                    border
                                    border-gray-200
                                    bg-white
                                    px-3
                                    py-2
                                    text-sm
                                    font-medium
                                    text-gray-700
                                    transition
                                    hover:bg-gray-50
                                    disabled:cursor-not-allowed
                                    disabled:opacity-40
                                "
                            >
                                <ChevronLeft className="h-4 w-4" />
                                Previous
                            </button>

                            <span
                                className="
                                    rounded-lg
                                    bg-gray-100
                                    px-3
                                    py-2
                                    text-sm
                                    font-medium
                                    text-gray-700
                                "
                            >
                                {safeCurrentPage} /{" "}
                                {totalPages}
                            </span>

                            <button
                                type="button"
                                disabled={
                                    safeCurrentPage >=
                                    totalPages
                                }
                                onClick={() =>
                                    setCurrentPage(
                                        (page) =>
                                            Math.min(
                                                totalPages,
                                                page + 1
                                            )
                                    )
                                }
                                className="
                                    inline-flex
                                    items-center
                                    gap-1
                                    rounded-lg
                                    border
                                    border-gray-200
                                    bg-white
                                    px-3
                                    py-2
                                    text-sm
                                    font-medium
                                    text-gray-700
                                    transition
                                    hover:bg-gray-50
                                    disabled:cursor-not-allowed
                                    disabled:opacity-40
                                "
                            >
                                Next
                                <ChevronRight className="h-4 w-4" />
                            </button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}