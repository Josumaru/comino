import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({ totalPages, currentPage, onPageChange }) => {
  const pagesToShow = 3;
  const startPage = Math.max(1, currentPage - Math.floor(pagesToShow / 2));
  const endPage = Math.min(totalPages, startPage + pagesToShow - 1);

  const pageNumbers = [];
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <View className="flex-row justify-center mt-4">
      <TouchableOpacity
        onPress={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <Text className={`font-semibold text-xl ${currentPage === 1 ? 'text-gray-400' : 'text-primary-500'}`}>
          Prev
        </Text>
      </TouchableOpacity>

      {startPage > 1 && (
        <>
          <TouchableOpacity onPress={() => onPageChange(1)}>
            <Text className="font-semibold text-xl text-gray-500 mx-2">1</Text>
          </TouchableOpacity>
          <Text className="font-semibold text-xl text-gray-500 mx-2">...</Text>
        </>
      )}

      {pageNumbers.map((page) => (
        <TouchableOpacity
          key={page}
          onPress={() => onPageChange(page)}
          className={`mx-2 ${page === currentPage ? 'text-primary-500' : 'text-gray-500'}`}
        >
          <Text className={`font-semibold text-xl ${page === currentPage ? 'text-primary-500' : 'text-gray-500'}`}>
            {page}
          </Text>
        </TouchableOpacity>
      ))}

      {endPage < totalPages && (
        <>
          <Text className="font-semibold text-xl text-gray-500 mx-2">...</Text>
          <TouchableOpacity onPress={() => onPageChange(totalPages)}>
            <Text className="font-semibold text-xl text-gray-500 mx-2">{totalPages}</Text>
          </TouchableOpacity>
        </>
      )}

      <TouchableOpacity
        onPress={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <Text className={`font-semibold text-xl ${currentPage === totalPages ? 'text-gray-400' : 'text-primary-500'}`}>
          Next
        </Text>
      </TouchableOpacity>
    </View>
  );
};
