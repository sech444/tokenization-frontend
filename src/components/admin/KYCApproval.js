import React, { useEffect, useState } from "react";
import { adminAPI } from "../../services/api";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
// import { Select } from "../../components/ui/select"; // if you have one
import { toast } from "react-hot-toast";

export default function KYCApproval() {
  const [kycList, setKycList] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [statusFilter, setStatusFilter] = useState("pending"); // 👈 default filter
  const [total, setTotal] = useState(0);

  const fetchKYC = async () => {
    setLoading(true);
    try {
      const data = await adminAPI.getKYC({
        page,
        limit: 10,
        status: statusFilter === "all" ? undefined : statusFilter,
      });

      setKycList(data.verifications || []);
      setTotal(data.count || 0);
    } catch (err) {
      toast.error("Failed to fetch KYC records");
    } finally {
      setLoading(false);
    }
  };

  const handleDecision = async (id, approved, notes = null) => {
    try {
      await adminAPI.updateKYC(id, approved, notes);
      toast.success(`KYC ${approved ? "approved" : "rejected"}`);
      fetchKYC();
    } catch (err) {
      toast.error("Failed to update KYC");
    }
  };

  useEffect(() => {
    fetchKYC();
  }, [page, statusFilter]); // 👈 refetch on filter change

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">KYC Approvals</h2>

      {/* Filter Controls */}
      <div className="flex justify-between items-center mb-4">
        <label className="text-sm text-gray-600">
          Filter by status:{" "}
          <select
            className="border rounded p-1"
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setPage(1); // reset to first page on filter change
            }}
          >
            <option value="all">All</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </label>
        <p className="text-sm text-gray-500">
          Page {page} — {total} total records
        </p>
      </div>

      {/* Records */}
      {loading ? (
        <p>Loading...</p>
      ) : kycList.length === 0 ? (
        <p className="text-gray-500">No records found</p>
      ) : (
        kycList.map((record) => (
           <Card key={record.user_id} className="mb-4">
            <CardContent className="flex flex-col md:flex-row justify-between md:items-center gap-3">
              <div>
                <p><strong>User:</strong> {record.user_email}</p>
                <p><strong>Status:</strong> {record.verification_status}</p>
                <p><strong>Risk:</strong> {record.risk_level}</p>
              </div>
              {record.verification_status === "pending" && (
                <div className="flex space-x-2">
                  <Button
                    size="sm"
                    onClick={() => handleDecision(record.user_id, true)}
                  >
                    Approve
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() =>
                      handleDecision(record.user_id, false, "Insufficient documents")
                    }
                  >
                    Reject
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        ))
      )}

      {/* Pagination */}
      {total > 10 && (
        <div className="flex justify-between mt-4">
          <Button
            size="sm"
            disabled={page <= 1}
            onClick={() => setPage((p) => p - 1)}
          >
            Prev
          </Button>
          <Button
            size="sm"
            disabled={page * 10 >= total}
            onClick={() => setPage((p) => p + 1)}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
}
