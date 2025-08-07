'use client';

import Ternary from "@/componentsNext/ternary";
import { TableRows } from "@/componentsNext/table/table.rows";
import Footer from "@/componentsNext/footer";
import { GoBackButton } from "@/componentsNext/goBackHeader/goBackButton";

const columns = [
    { property: "name", label: "Nome" },
    { property: "age", label: "Idade" },
];
const data = [
    { id: "1", name: "Gabriel", age: 30 },
    { id: "2", name: "Paulo", age: 25 },
];
const mapTo = (row: any) => ({
    name: { content: row.name },
    age: { content: row.age },
});

export default function Teste() {
    return (
        <div className="space-y-8">

            <Ternary condition={true}>
                <div>Verdadeiro</div>
                <div>Falso</div>
            </Ternary>

            <div>
                <h2 className="font-bold mb-2">Tabela de Exemplo</h2>
                <table>
                    <TableRows
                        data={data}
                        columns={columns}
                        mapTo={mapTo}
                        emptyMessage="Sem dados"
                    />
                </table>
            </div>
            <Footer />
            <GoBackButton />
        </div>
    );
}