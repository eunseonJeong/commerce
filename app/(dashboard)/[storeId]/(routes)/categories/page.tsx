import db from "@/lib/prismadb";
import { CategoryClient } from "@/app/(dashboard)/[storeId]/(routes)/categories/_components/client";
import { CategoryColumn } from "@/app/(dashboard)/[storeId]/(routes)/categories/_components/columns";
import { format } from "date-fns";
import { ko } from "date-fns/locale";

const Categories = async ({ params }: { params: { storeId: string } }) => {
  // 카테고리 리스트 DB에서 가져오기
  const categoriesList = await db.category.findMany({
    where: {
      storeId: params.storeId,
    },
    include: {
      billboard: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  //카테고리 데이터 가공
  const formattedCategories: CategoryColumn[] = categoriesList.map((item) => ({
    id: item.id,
    name: item.name,
    billboardLabel: item.billboard.label,
    createdAt: format(item.createdAt, "yyyy-MM-dd", { locale: ko }),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CategoryClient data={formattedCategories} />
      </div>
    </div>
  );
};

export default Categories;