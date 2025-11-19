"use client";

import { Button } from "@/components/ui/button";
import PageTitle from "@/components/ui/page-title";
import { IPackage } from "@/interfaces";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { getAllPackages } from "@/server-actions/package";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { getDateTimeFormat } from "@/helpers/date-time-format";
import { Edit2, icons, Trash, Trash2 } from "lucide-react";
import Spinner from "@/components/ui/spinner";
import InfoMessage from "@/components/ui/info-message";

function AdminPackagesList() {
  const [loading, setLoading] = useState(true);
  const [packages, setPackages] = useState<IPackage[]>([]);
  const router = useRouter();

  const fetchPackages = async () => {
    setLoading(true);
    const response = await getAllPackages();
    if (response.success) {
      setPackages(response.data);
    } else {
      setPackages([]);
      console.log("Failed to fetch packages:", response.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPackages();
  }, []);

  const columns = [
    "Id",
    "Name",
    "Package Start Date & Time",
    "Package End Date & Time",
    "Package Price",
    "Created At",
    "Actions",
  ];

  return (
    <div className='flex flex-col gap-8'>
      <div className='flex justify-between items-center'>
        <PageTitle title='Packages' />
        <Button>
          <Link href='/admin/packages/add'>Add package</Link>
        </Button>
      </div>
      {loading && <Spinner />}
      {!loading && packages.length === 0 && (
        <div className='text-center text-gray-500'>
          <InfoMessage message='No packages found. Please add a package.' />
        </div>
      )}

      {!loading && packages.length > 0 && (
        <Table>
          <TableHeader className=''>
            <TableRow className='bg-gray-100 '>
              {columns.map((column, index) => (
                <TableHead className='font-bold text-primary ' key={index}>
                  {column}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {packages.map((packageData: IPackage) => (
              <TableRow key={packageData.id}>
                <TableCell>{packageData.id}</TableCell>
                <TableCell>{packageData.name}</TableCell>
                <TableCell>
                  {getDateTimeFormat(packageData.start_date_time)}
                </TableCell>
                <TableCell>
                  {getDateTimeFormat(packageData.end_date_time)}
                </TableCell>
                <TableCell>
                  ${packageData.price_per_member.toFixed(2)}
                </TableCell>
                <TableCell>
                  {getDateTimeFormat(packageData.created_at)}
                </TableCell>
                <TableCell>
                  <div className='flex gap-5 p-3'>
                    <Button
                      size={"icon"}
                      variant='outline'
                      onClick={() => {
                        router.push(`/admin/packages/edit/${packageData.id}`);
                      }}
                    >
                      <Edit2 size={16} />
                    </Button>
                    <Button size={"icon"} variant='outline'>
                      <Trash2 size={16} />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
}

export default AdminPackagesList;
