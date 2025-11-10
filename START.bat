@echo off
echo Starting DAMS System...
echo.

cd /d "c:\Users\pesak\Desktop\brandoni"

echo Step 1: Generating Prisma Client...
call npm run db:generate

echo.
echo Step 2: Pushing database schema...
call npm run db:push

echo.
echo Step 3: Seeding sample data...
call npm run db:seed

echo.
echo Step 4: Starting development server...
call npm run dev

pause
