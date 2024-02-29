import React from "react";
import { Paper, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import { CurrencyRupee, HourglassTop } from "@mui/icons-material";
import moment from "moment";

export const Transaction = ({ statements }: any) => {

    const getIcon = (status: string) => {
        switch (status) {
            case 'INITIATED':
                return <><HourglassTop /> Initiated</>
        }
    }
    return (
        <TableContainer>
            <Table aria-label="simple table">
                <TableBody>
                    {statements && statements.map((tran: any) => (
                        <TableRow
                            key={tran.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            className="tableRow"
                        >
                            <TableCell className={tran.mode === 'CREDIT' ? 'creditType' : 'debitType'}>
                                {tran.mode === 'CREDIT' ? '+' : '-'}<CurrencyRupee />{tran.amount}
                            </TableCell>
                            <TableCell>{getIcon(tran.status)}</TableCell>
                            <TableCell className="datedOn">{moment(tran.created_at).format('Do MMM YYYY hh:mm A')}</TableCell>
                        </TableRow>
                    ))}
                    {!statements && <TableRow
                        key={0}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                        <TableCell>
                            No transactions found
                        </TableCell>
                    </TableRow>}
                </TableBody>
            </Table>
        </TableContainer>
    )
}