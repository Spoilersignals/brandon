@echo off
echo Setting up DAMS Database...

echo.
echo Creating database...
"C:\Program Files\PostgreSQL\17\bin\createdb.exe" -U postgres dams

echo.
echo Running migrations...
cd /d "c:\Users\pesak\Desktop\brandoni"
call npm run db:generate
call npm run db:push
call npm run db:seed

echo.
echo Done! Now run: npm run dev
pause
