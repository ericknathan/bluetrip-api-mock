-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "nationality" TEXT NOT NULL,
    "birthDate" TIMESTAMP(3) NOT NULL,
    "gender" TEXT NOT NULL,
    "language" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "phone" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TouristicSpot" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "averageRate" INTEGER NOT NULL,
    "price" INTEGER NOT NULL,
    "phone" TEXT,
    "imageUrl" TEXT NOT NULL,
    "category" TEXT NOT NULL,

    CONSTRAINT "TouristicSpot_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Address" (
    "id" SERIAL NOT NULL,
    "street" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "zipCode" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "neighborhood" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "complement" TEXT,
    "touristicSpotId" INTEGER NOT NULL,

    CONSTRAINT "Address_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Event" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "startDate" TEXT NOT NULL,
    "endDate" TEXT NOT NULL,
    "touristicSpotId" INTEGER NOT NULL,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LocalBusiness" (
    "id" SERIAL NOT NULL,
    "tradeName" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "averageRating" INTEGER NOT NULL,
    "websiteUrl" TEXT NOT NULL,
    "openHour" TEXT NOT NULL,
    "closeHour" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "businessCategory" TEXT NOT NULL,

    CONSTRAINT "LocalBusiness_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Reservation" (
    "id" SERIAL NOT NULL,
    "date" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    "paymentMethod" TEXT NOT NULL,
    "externalId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Reservation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Address_touristicSpotId_key" ON "Address"("touristicSpotId");

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_touristicSpotId_fkey" FOREIGN KEY ("touristicSpotId") REFERENCES "TouristicSpot"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_touristicSpotId_fkey" FOREIGN KEY ("touristicSpotId") REFERENCES "TouristicSpot"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
